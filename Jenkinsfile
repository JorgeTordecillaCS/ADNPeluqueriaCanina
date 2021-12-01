pipeline{
	
		agent {
		label 'Slave_Induccion'
		}

		tools {
		nodejs 'NodeJS14'
		}
		
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout scm
				sh 'npm -v'
				sh 'node -v'
				}
			}
		
		
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }

            stage('test '){
                steps {
                    sh 'npm run test:cov'					
				}
            }

			
			 stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=ADN:PeluqueriaCanina.jorge.tordecilla -Dsonar.projectName=ADN:PeluqueriaCanina.jorge.tordecilla -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }
		
		

		}
		post {
			failure {
				mail(to: 'jorge.tordecilla@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}