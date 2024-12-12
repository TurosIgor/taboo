pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }
    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version number for the Docker images')
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-repo.git', branch: 'main'
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
                        expression { env.BUILD_DATABASE == 'true' }
                    }
                    steps {
                        dir('database') {
                            sh "docker build -t <ecr-repo>/database:${params.VERSION} ."
                            sh '''
                            aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <ecr-repo>
                            docker push <ecr-repo>/database:${params.VERSION}
                            '''
                        }
                    }
                }
                stage('Backend') {
                    when {
                        expression { env.BUILD_BACKEND == 'true' }
                    }
                    steps {
                        dir('backend') {
                            sh "docker build -t <ecr-repo>/backend:${params.VERSION} ."
                            sh '''
                            aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <ecr-repo>
                            docker push <ecr-repo>/backend:${params.VERSION}
                            '''
                        }
                    }
                }
                stage('Frontend') {
                    when {
                        expression { env.BUILD_FRONTEND == 'true' }
                    }
                    steps {
                        dir('frontend') {
                            sh "docker build -t <ecr-repo>/frontend:${params.VERSION} ."
                            sh '''
                            aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <ecr-repo>
                            docker push <ecr-repo>/frontend:${params.VERSION}
                            '''
                        }
                    }
                }
            }
        }
        stage('Terraform Apply') {
            when {
                expression {
                    env.BUILD_DATABASE == 'true' || env.BUILD_BACKEND == 'true' || env.BUILD_FRONTEND == 'true'
                }
            }
            steps {
                dir('terraform') {
                    sh '''
                    terraform init
                    terraform apply -auto-approve \
                        -var "database_image_version=${params.VERSION}" \
                        -var "backend_image_version=${params.VERSION}" \
                        -var "frontend_image_version=${params.VERSION}"
                    '''
                }
            }
        }
    }
}
