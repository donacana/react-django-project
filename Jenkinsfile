
pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Check') {
            steps {
                sh '''
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('Compose Config Check') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} config
                '''
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} down || true
                '''
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} build
                '''
            }
        }

        stage('Start Postgres') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} up -d postgres
                    sleep 10
                '''
            }
        }

        stage('Build React') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} run --rm frontend
                '''
            }
        }

        stage('Start Backend And Nginx') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} up -d backend nginx
                '''
            }
        }

        stage('Status') {
            steps {
                sh '''
                    docker compose -f ${COMPOSE_FILE} ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Jenkins 배포 성공'
        }

        failure {
            echo 'Jenkins 배포 실패'
            sh '''
                docker compose -f docker-compose.yaml logs --tail=100 || true
            '''
        }
    }
}