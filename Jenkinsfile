pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/TurosIgor/taboo.git', branch: 'main')
      }
    }

    stage('Load Current Versions') {
      steps {
        script {
          def versionFile = readFile('versions.txt').trim()
          def versions = versionFile.split('\n').collectEntries {
            def (key, value) = it.split('=')
            [(key): value]
          }
          env.CURRENT_DATABASE_VERSION = versions.database ?: params.VERSION
          env.CURRENT_BACKEND_VERSION = versions.backend ?: params.VERSION
          env.CURRENT_FRONTEND_VERSION = versions.frontend ?: params.VERSION
        }

      }
    }

    stage('Determine Changes') {
      steps {
        script {
          def changedFiles = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim().split('\n')
          env.BUILD_DATABASE = changedFiles.any { it.startsWith('database/') } ? 'true' : 'false'
          env.BUILD_BACKEND = changedFiles.any { it.startsWith('backend/') } ? 'true' : 'false'
          env.BUILD_FRONTEND = changedFiles.any { it.startsWith('frontend/') } ? 'true' : 'false'
        }

      }
    }

    stage('Build and Push Images') {
      parallel {
        stage('Database') {
          when {
            expression {
              env.BUILD_DATABASE == 'true'
            }

          }
          steps {
            dir(path: 'database') {
              script {
                sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/database:${params.VERSION} ."
                sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/database:${params.VERSION}"
                env.CURRENT_DATABASE_VERSION = params.VERSION
              }

            }

          }
        }

        stage('Backend') {
          when {
            expression {
              env.BUILD_BACKEND == 'true'
            }

          }
          steps {
            dir(path: 'backend') {
              script {
                sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/backend:${params.VERSION} ."
                sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/backend:${params.VERSION}"
                env.CURRENT_BACKEND_VERSION = params.VERSION
              }

            }

          }
        }

        stage('Frontend') {
          when {
            expression {
              env.BUILD_FRONTEND == 'true'
            }

          }
          steps {
            dir(path: 'frontend') {
              script {
                sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/frontend:${params.VERSION} ."
                sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/frontend:${params.VERSION}"
                env.CURRENT_FRONTEND_VERSION = params.VERSION
              }

            }

          }
        }

      }
    }

    stage('Update Version File') {
      steps {
        script {
          def newVersions = """
          database=${env.CURRENT_DATABASE_VERSION}
          backend=${env.CURRENT_BACKEND_VERSION}
          frontend=${env.CURRENT_FRONTEND_VERSION}
          """.trim()
          writeFile file: 'versions.txt', text: newVersions
          sh "git add versions.txt"
          sh "git commit -m 'Update image versions'"
          sh "git push origin main"
        }

      }
    }

    stage('Terraform Apply') {
      steps {
        dir(path: 'terraform') {
          sh """
                              terraform init
                              terraform apply -auto-approve \
                                  -var "database_image_version=${env.CURRENT_DATABASE_VERSION}" \
                                  -var "backend_image_version=${env.CURRENT_BACKEND_VERSION}" \
                                  -var "frontend_image_version=${env.CURRENT_FRONTEND_VERSION}"
                              """
        }

      }
    }

  }
  environment {
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    VERSION = "${BUILD_NUMBER}"
  }
}