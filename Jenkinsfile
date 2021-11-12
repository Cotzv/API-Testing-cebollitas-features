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
    stage('Tests Features') {
      parallel {
        
        stage('Posts feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('NodeJS') {
                sh 'npm run test-posts'
              }
            }
          }              
        }
        stage('Categories feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('NodeJS') {
                sh 'npm run test-categories'
              }
            }
          }        
        }
        stage('Autosaves feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('NodeJS') {
                sh 'npm run test-autosaves'
              }
            }
          }          
        }
      }
    }
  }
}