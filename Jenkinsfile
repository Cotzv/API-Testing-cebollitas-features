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
  }
}