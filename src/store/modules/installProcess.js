import {
  getClusterInfo,
  putClusterInfo,
  addsCluster,
  getClusterInstallResults,
  getClusterInstallResultsState
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
    }
  }
}
export default installProcess
