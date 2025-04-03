pipeline {
    agent any

    environment {
        REACT_APP_AUTH0_CLIENT_ID = credentials('REACT_APP_AUTH0_CLIENT_ID')
        REACT_APP_AUTH0_DOMAIN = credentials('REACT_APP_AUTH0_DOMAIN')
        VERSION = credentials('VERSION')
        USR = credentials('USR')
        COLLECTION_NAME = credentials('COLLECTION_NAME')
        DB_NAME = credentials('DB_NAME')
        BACKEND_PORT = credentials('BACKEND_PORT')
        FRONTEND_PORT = credentials('FRONTEND_PORT')
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Verify Checkout') {
            steps {
                script {
                    sh 'pwd'
                    sh 'ls -R'  // Check if files exist
                }
            }
        }

        stage('Install Dependencies (Frontend)') {
            steps {
                script {
                    dir('client') {
                        echo "Installing dependencies for Frontend..."
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install Dependencies (Backend)') {
            steps {
                script {
                    dir('server') {
                        echo "Installing dependencies for Backend..."
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Verify Deployment Files') {
            steps {
                script {
                    echo "Verifying Kubernetes deployment files..."
                    sh 'ls -l ${WORKSPACE}/client/frontend-deployment-service.yml'
                    sh 'ls -l ${WORKSPACE}/server/backend-deployment-service.yml'
                }
            }
        }
        stage('Apply ConfigMap') {
            steps {
                script {
                    echo "Applying ConfigMap..."
                    sh "export KUBECONFIG=/var/lib/jenkins/.kube/config && kubectl apply -f ${WORKSPACE}/config-map.yml"
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    echo "Deploying Frontend..."
                    sh "KUBECONFIG=${KUBECONFIG} kubectl apply -f ${WORKSPACE}/client/frontend-deployment-service.yml"
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    echo "Deploying Backend..."
                    sh "KUBECONFIG=${KUBECONFIG} kubectl apply -f ${WORKSPACE}/server/backend-deployment-service.yml"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Please check the logs for errors."
        }
    }
}
