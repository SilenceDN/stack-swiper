let wrapper = document.querySelector('.banner-wrapper'),
    direction,
    towerStart
;(function() {
    let list = [
        { url: './imgs/1.jpg' },
        { url: './imgs/2.jpg' },
        { url: './imgs/3.jpg' },
        { url: './imgs/4.jpg' },
        { url: './imgs/5.jpg' }
    ]
    for (let i = 0; i < list.length; i++) {
        list[i].zIndex =
            parseInt(list.length / 2) +
            1 -
            Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
    }
    render(list)
    wrapper.addEventListener('touchstart', e => {
        towerStart = e.touches[0].pageX
    })
    wrapper.addEventListener('touchmove', e => {
        direction = e.touches[0].pageX - towerStart > 0 ? 'right' : 'left'
    })
    wrapper.addEventListener('touchend', e => {
        render(list)
    })
})()

function ensureEl(item, update) {
    if (item.el && !update) return
    if (update) {
        let el = item.el
        el.style.cssText = `transform:scale(${0.5 +
            item.zIndex / 10});margin-left:${item.mLeft * 100 -
            150}px;z-index:${item.zIndex}`
    } else {
        let el = document.createElement('div')
        let elChild = document.createElement('div')
        el.classList.add('banner-item')
        el.style.cssText = `transform:scale(${0.5 +
            item.zIndex / 10});margin-left:${item.mLeft * 100 -
            150}px;z-index:${item.zIndex}`
        elChild.className = 'bg-img shadow-blur'
        elChild.style.cssText = `background-image:url(${item.url})`
        el.appendChild(elChild)
        item.el = el
    }
}

function render(list) {
    if (!wrapper.childNodes.length) {
        let fragment = document.createDocumentFragment()
        list.forEach(item => {
            ensureEl(item)
            fragment.appendChild(item.el)
        })
        wrapper.appendChild(fragment)
    } else {
        if (direction == 'right') {
            let mLeft = list[0].mLeft
            let zIndex = list[0].zIndex
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft
            list[list.length - 1].zIndex = zIndex
        } else {
            let mLeft = list[list.length - 1].mLeft
            let zIndex = list[list.length - 1].zIndex
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft
            list[0].zIndex = zIndex
        }
        list.forEach(item => ensureEl(item, true))
    }
}
