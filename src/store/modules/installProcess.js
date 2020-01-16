import {
  getClusterInfo,
  putClusterInfo,
  addsCluster,
  detectionCluster,
  getClusterInstallResults,
  getClusterInstallResultsState,
  getAccessAddress,
  deleteUnloadingPlatform
} from '@/api/installProcess'

const installProcess = {
  state: {},
  mutations: {},
  actions: {
    fetchClusterInfo ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        getClusterInfo(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fixClusterInfo ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        putClusterInfo(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addCluster ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        addsCluster(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    detectionCluster ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        detectionCluster(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    fetchClusterInstallResults ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        getClusterInstallResults(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchClusterInstallResultsState ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        getClusterInstallResultsState(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchAccessAddress ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        getAccessAddress(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteUnloadingPlatform ({ commit }, resdata) {
      return new Promise((resolve, reject) => {
        deleteUnloadingPlatform(resdata)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default installProcess
