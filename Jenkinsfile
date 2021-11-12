pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        nodejs('NodeJS') {
          sh 'npm install'
        }
      }
    }
    stage('Run Tests') {
      steps {
        nodejs('NodeJS') {
          sh 'npm run test-posts'
        }
      }
    }
  }
}