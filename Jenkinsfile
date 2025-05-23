pipeline {
    agent any
    environment {
        AWS_CREDENTIALS=credentials('aws-credentials')
        VERSION = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/TurosIgor/taboo.git', branch: 'master'
            }
        }
        stage('Load Current Versions') {
            steps {
                script {
                    def versionFile = readFile('versions.txt').trim()
                    def versions = versionFile.split(';').collectEntries { 
                        def (key, value) = it.split('=')
                        [(key): value]
                    }
                    env.CURRENT_DATABASE_VERSION = versions.database ?: env.VERSION
                    env.CURRENT_BACKEND_VERSION = versions.backend ?: env.VERSION
                    env.CURRENT_FRONTEND_VERSION = versions.frontend ?: env.VERSION
                }
            }
        }
        stage('Determine Changes') {
            steps {
                script {
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1 HEAD', returnStdout: true).trim().split('\n')
                    env.VERSION_CHANGE = changedFiles.any { it.startsWith('versions')} ? 'true' : 'false'
                    env.BUILD_DATABASE = changedFiles.any { it.startsWith('database/') } ? 'true' : 'false'
                    env.BUILD_BACKEND = changedFiles.any { it.startsWith('server/') } ? 'true' : 'false'
                    env.BUILD_FRONTEND = changedFiles.any { it.startsWith('taboo/') } ? 'true' : 'false'
                }
            }
        }
        stage('Main Build') {
            when { expression { env.VERSION_CHANGE == 'false' } }
            stages {
                stage('Build and Push Images') {
                    parallel {
                        stage('Database') {
                            when { expression { env.BUILD_DATABASE == 'true' } }
                            steps {
                                dir('database') {
                                    script {
                                        sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/database:${env.VERSION} ."
                                        sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                                        sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/database:${env.VERSION}"
                                        env.CURRENT_DATABASE_VERSION = env.VERSION
                                    }
                                }
                            }
                        }
                        stage('Backend') {
                            when { expression { env.BUILD_BACKEND == 'true' } }
                            steps {
                                dir('server') {
                                    script {
                                        sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/backend:${env.VERSION} ."
                                        sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                                        sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/backend:${env.VERSION}"
                                        env.CURRENT_BACKEND_VERSION = env.VERSION
                                    }
                                }
                            }
                        }
                        stage('Frontend') {
                            when { expression { env.BUILD_FRONTEND == 'true' } }
                            steps {
                                dir('taboo') {
                                    script {
                                        sh "docker build -t 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/frontend:${env.VERSION} ."
                                        sh "aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo"
                                        sh "docker push 905418131003.dkr.ecr.eu-north-1.amazonaws.com/taboo/frontend:${env.VERSION}"
                                        env.CURRENT_FRONTEND_VERSION = env.VERSION
                                    }
                                }
                            }
                        }
                    }
                }
                stage('Update Version File') {
                    steps {
                        script {
                            withCredentials([usernamePassword(credentialsId: 'github-pat-uap', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                                def newVersions = "database=${env.CURRENT_DATABASE_VERSION};backend=${env.CURRENT_BACKEND_VERSION};frontend=${env.CURRENT_FRONTEND_VERSION}".trim()
                                writeFile file: 'versions.txt', text: newVersions
                                sh '''
                                git config --global user.name "${GIT_USERNAME}"
                                git config --global user.password "${GIT_PASSWORD}"
                                git add versions.txt
                                git commit -m 'Update image versions'
                                git push https://${GIT_PASSWORD}@github.com/${GIT_USERNAME}/taboo.git
                                '''
                            }
                        }
                    }
                }
                stage('Terraform Apply') {
                    steps {
                        dir('infra') {
                            sh """
                            cd terraform
                            terraform init
                            terraform apply -auto-approve \
                                -var "db_image_version=${env.CURRENT_DATABASE_VERSION}" \
                                -var "be_image_version=${env.CURRENT_BACKEND_VERSION}" \
                                -var "fe_image_version=${env.CURRENT_FRONTEND_VERSION}"
                            """
                        }
                    }
                }
            }
        }
    }
}
