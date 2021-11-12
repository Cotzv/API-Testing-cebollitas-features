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
        stage('Pages feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('NodeJS') {
                sh 'npm run test-pages'
              }
            }
          }          
        }
      }
    }
    stage('Tests Reports') {
      parallel {
        stage('Autosaves feature') {
          steps {
            publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'reportAutosaves.html', reportName: 'Autosaves Report')
            }
        } 
        stage('Posts feature') {
          steps {
            publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'reportPosts.html', reportName: 'Posts Report')
            }
        }   
        stage('Categories feature') {
          steps {
            publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'reportCategories.html', reportName: 'Categories Report')
            }
        }    
        stage('Pages feature') {
          steps {
            publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'reportPages.html', reportName: 'Pages Report')
            }
        }     
      }
    }
  }
  post {
    always {
      mail(to: 'sthrhll7@gmail.com', subject: "Build report: ${env.BUILD_DISPLAY_NAME}", body: "Build report: ${env.BUILD_URL} -- Artifacts: ${env.RUN_ARTIFACTS_DISPLAY_URL}")
    }
    failure {
      mail(to: 'sthrhll7@gmail.com', subject: "Artifacts - (${env.BUILD_DISPLAY_NAME})", body: "Artifacts  ${env.RUN_ARTIFACTS_DISPLAY_URL} results")
    }
  }
}