export const REG_EXP_EMAIL = new RegExp(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
)

export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
)

export class Form {
  FIELD_NAME = {}
  FIELD_ERROR = {}

  value = {}
  error = {}
  disabled = false

  change = (name, value) => {
    const error = this.validate(name, value)
    this.value[name] = value

    this.checkValid(name, value)
  }

  // setError = (name, error) => {
  //   const errorEl = document.querySelector(
  //     `.form__error[name="${name}"]`,
  //   )

  //   if (!error) {
  //     errorEl.style.display = 'none'
  //     errorEl.textContent = ''

  //     document
  //       .querySelector(
  //         `.validation--active[name="${name}"]`,
  //       )
  //       .classList.replace(
  //         'validation--active',
  //         'validation',
  //       )
  //   } else {
  //     errorEl.style.display = 'block'
  //     errorEl.textContent = error

  //     document
  //       .querySelector(`.validation[name="${name}"]`)
  //       .classList.replace(
  //         'validation',
  //         'validation--active',
  //       )
  //   }
  // }

  setError = (name, error) => {
    const span = document.querySelector(
      `.form__error[name="${name}"]`,
    )

    const field = document.querySelector(
      `.validation[name="${name}"]`,
    )

    if (span) {
      span.classList.toggle(
        'form__error--active',
        Boolean(error),
      )

      span.innerText = error || ''
    }

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }
  }

  checkValid = (name, value) => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
        this.error[name] = error
        disabled = true
      } else {
        this.setError(name, null)
        delete this.error[name]
      }
    })

    const el = document.querySelector(`.button`)

    if (el) {
      el.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      )
    }

    this.disabled = disabled
  }
}
