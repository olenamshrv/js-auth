class FieldSelect {
  static #shownValue = null

  static #previousSelectedOption = null

  static isOpen = false

  static init = () => {
    this.#shownValue = document.querySelector(
      '.field__placeholder',
    )
    // console.log(this, this.#shownValue)
  }

  static changeOption = (target) => {
    // console.log(target)

    // console.log('target.innerHTML', target.innerHTML)

    // console.log(
    //   'this.#shownValue.innerHTML',
    //   this.#shownValue.innerHTML,
    // )

    this.#previousSelectedOption = document.querySelector(
      '.list__option--selected',
    )

    // console.log(
    //   'previous init',
    //   this.#previousSelectedOption,
    // )

    if (
      this.#shownValue.innerHTML !== target.innerHTML &&
      this.#previousSelectedOption !== null
    ) {
      this.#previousSelectedOption.classList.remove(
        'list__option--selected',
      )
      this.#previousSelectedOption = target
    }

    this.#shownValue.innerHTML = target.innerHTML

    target.classList.add('list__option--selected')

    this.#shownValue.classList.add(
      'field__placeholder--selected',
    )

    FieldSelect.toggleList()
  }

  static toggleList = () => {
    const list = document.querySelector('.options-list')

    if (list.offsetHeight === 1) {
      list.style.setProperty('height', 'fit-content')
    } else {
      list.style.height = 0
    }

    this.isOpen = !this.isOpen
  }
}

FieldSelect.init()

window.fieldSelect = FieldSelect

const pointerArea = document.querySelector('.pointerArea')

pointerArea.addEventListener('pointerleave', (event) => {
  if (FieldSelect.isOpen) {
    return FieldSelect.toggleList()
  }
})

//=============from Lesson=================

// class FieldSelect {
//   static toggle = (target) => {
//     const options = target.nextElementSibling

//     options.toggleAttribute('active')
//     setTimeout((GF) => {
//       window.addEventListener(
//         'click',
//         (e) => {
//           if (options.parentElement.contains(e.target)) {
//             options.removeAttribute('active')
//           }
//         },
//         { once: true },
//       )
//     })
//   }

//   static change = (target) => {
//     const parent = target.parentElement.parentElement
//     const list = target.parentElement

//     const active = list.querySelector('*[active]')

//     if (active) toggleAttribute('active')

//     // ==

//     target.toggleAttribute('active')

//     //==

//     const value = parent.querySelector('.field__value')

//     if (value) {
//       value.innerText = target.innerText
//       value.classList.remove('field__value--placeholder')
//     }

//     // ==

//     list.toggleAttribute('active')
//   }
// }

// window.fieldSelect = FieldSelect
