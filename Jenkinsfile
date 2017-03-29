buildNr = "${env.BUILD_NUMBER}"
releaseNr = 1
sprintNr = 20
fixNr = 0


node('jenkins-slave-backend') {
    stage('Checkout') {
        checkout scm

        withEnv(getEnvironment()) {
            currentBuild.displayName = env.APP_VERSION
        }
    }

    stage('Commit') {
        withEnv(getEnvironment()) {
            sh 'npm run build'
        }
    }

    stage('Docker Image') {
        withEnv(getEnvironment()) {
            sh 'sudo docker build --rm -t gp-docker-registry:5000/calculation-ui:$APP_VERSION .'
            sh 'sudo docker push gp-docker-registry:5000/calculation-ui:$APP_VERSION'
            sh 'sudo docker rmi gp-docker-registry:5000/calculation-ui:$APP_VERSION'
        }
    }
}

def getEnvironment() {
    def BRANCH_NAME = getBranchName()
    return [
        "BRANCH_NAME=$BRANCH_NAME",
        "APP_VERSION=${releaseNr}.${sprintNr}.${fixNr}.b${buildNr}" + (BRANCH_NAME == "master" ? "" : "_$BRANCH_NAME")
    ]
}

def getBranchName() {
    sh "git rev-parse --abbrev-ref HEAD > result";
    return readFile('result').trim()
}
