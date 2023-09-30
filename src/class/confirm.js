class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () =>
    Math.trunc(Math.random() * 9000) + 1000

  static create = (data) => {
    this.#list.push(new Confirm(data))

    setTimeout(() => {
      this.delete(code)
    }, 1000 * 60 * 60 * 24)

    console.log(this.#list)
  }

  static delete = (code) => {
    const length = this.#list.length

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

  static getData = (code) => {
    const confirm = this.#list.find(
      (item) => item.code === code,
    )
    return confirm ? confirm.data : null
  }
}

module.exports = {
  Confirm,
}
