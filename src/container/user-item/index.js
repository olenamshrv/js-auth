import { List } from '../../script/list'

import { USER_ROLE } from '../../script/user'

class UserItem extends List {
  constructor() {
    super()

    this.element = document.querySelector('#user-item')
    if (!this.element) throw new Error('Element is null')

    this.id = new URLSearchParams(location.search).get('id')
    // this.id = new URL(location.href).searchParams.get('id')
    if (!this.id) location.assign('/user-list')

    this.loadData()
  }

  loadData = async () => {
    this.updateStatus(this.STATE.LOADING)

    // return null

    const userId = new URL(
      document.location,
    ).searchParams.get('id')

    console.log(userId)

    try {
      const res = await fetch(
        // `/user-item-data?id=${userId}`,
        `/user-item-data?id=${this.id}`,
        {
          method: 'GET',
        },
      )

      console.log(res)

      const data = await res.json()

      console.log('data', data)

      if (res.ok) {
        this.updateStatus(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.updateStatus(this.STATE.ERROR, data)
      }
    } catch (error) {
      console.log(error)
      this.updateStatus(this.STATE.ERROR, {
        message: error.message,
      })
    }
  }

  convertData = (data) => {
    return {
      ...data,
      role: USER_ROLE[data.role],
      isConfirm: data.isConfirm ? 'Так' : 'Ні',
    }
  }

  // convertData = (data) => {
  //   return {
  //     ...data,
  //     user: {
  //       ...data.user,
  //       role: USER_ROLE[data.user.role],
  //       isConfirm: data.user.isConfirm ? 'Так' : 'Ні',
  //     },
  //   }
  // }

  updateView = () => {
    this.element.innerHTML = ''
    console.log(this.status, this.data)

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `
        <div class="user-data">
          <div class="user-data__item">
            <span class="user-data__title">ID</span>
            <span class="user-data__sub skeleton"></span>
          </div>  
        </div>
        <div class="user-data">
          <div class="user-data__item">
            <span class="user-data__title">E-mail</span>
            <span class="user-data__sub skeleton"></span>
          </div>  
        </div>
        <div class="user-data">
          <div class="user-data__item">
            <span class="user-data__title">Роль</span>
            <span class="user-data__sub skeleton"></span>
          </div>  
        </div>
        <div class="user-data">
          <div class="user-data__item">
            <span class="user-data__title">Пошта підвтерджена?</span>
            <span class="user-data__sub skeleton"></span>
          </div>  
        </div>`
        break
      case this.STATE.SUCCESS:
        const { id, email, role, isConfirm } = this.data

        this.element.innerHTML += `       
          <div class="user-data">
            <div class="user-data__item">
              <span class="user-data__title">ID</span>
              <span class="user-data__sub">${id}</span>
            </div>  
          </div>
          <div class="user-data">
            <div class="user-data__item">
              <span class="user-data__title">Е-mail</span>
              <span class="user-data__sub">${email}</span>
            </div>  
          </div>
          <div class="user-data">
            <div class="user-data__item">
              <span class="user-data__title">Роль</span>
              <span class="user-data__sub">${role}</span>
            </div>  
          </div>
          <div class="user-data">
            <div class="user-data__item">
              <span class="user-data__title">Пошта підтверджена?</span>
              <span class="user-data__sub">${isConfirm}</span>
            </div>  
          </div>`
        break
      case this.STATE.ERROR:
        this.element.innerHTML = `
        <span class="alert alert--error">${this.data.message}</span>`
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!window.session || !window.session.user.isConfirm) {
      location.assign('/')
    }
  } catch (e) {}

  new UserItem()
})
