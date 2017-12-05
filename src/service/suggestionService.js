import { debounce } from '../util'

function getSuggestions() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                total: 15,
                items: [
                    { name: 'B612', logo: '../example/img/b612.png' },
                    { name: 'LOOKS', logo: '../example/img/linelooks.png' },
                    { name: 'LINE MAN', logo: '../example/img/lineman.png' },
                    { name: 'Emoji LINE', logo: '../example/img/emojiline.png' },
                    { name: 'LINE@', logo: '../example/img/lineat.png' },
                    { name: 'LINE TV', logo: '../example/img/linetools.jpg' },
                    { name: 'LINE Camera', logo: '../example/img/linecamera.png' },
                    { name: 'LINE Dictionary English-Indonesian', logo: '' },
                    { name: 'LINE DECO', logo: '../example/img/linedeco.jpg' },
                    { name: 'LINE PLAY', logo: '../example/img/lineplay.png' },
                    { name: 'LINE Antivirus', logo: '../example/img/lineantivirus.jpg' },
                    { name: 'LINE Tools', logo: '../example/img/linetools.jpg' },
                    { name: 'LINE Dictionary English-Thai', logo: '../example/img/enth.png' },
                    { name: 'LINE Dictionary Chinese-English', logo: '../example/img/cnen.png' },
                    { name: 'LINE SHOP', logo: '../example/img/lineshop.png' },
                ]
            })
        }, 2000)
    })
}

const getSuggestionsWithDebounce = debounce(getSuggestions)

export {
    getSuggestions,
    getSuggestionsWithDebounce 
}