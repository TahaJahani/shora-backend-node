const dictionary = {
    id: 'آی‌دی',
}
module.exports = {
    translate: (word) => {
        return dictionary[word] ? dictionary[word] : word
    }
}