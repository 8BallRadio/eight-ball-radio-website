import Api from '@/../services/Api'

export default {
  fetchShows () {
    return Api().get('shows')
  },
  fetchShowPage () {
    return Api().get('show_page')
  }
}
