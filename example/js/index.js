import { LineSuggestions } from '../../src'

const firstInput = document.querySelector('#firstinput')
const secInput = document.querySelector('#secinput')

const firstInputWithSuggestions = new LineSuggestions(firstInput)
const secInputWithSuggestions = new LineSuggestions(secInput)