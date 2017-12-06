import useDefaultProps from './useDefaultProps'
import searchSuggestions from './searchSuggestions'
import nop from './nop'
import debounce from './debounce'
import {
    isEnterKey,
    isArrowDownKey,
    isArrowUpKey
} from './keyboard'
import { 
    getSuggestionHistory,
    setSuggestionHistory,
    removeSuggestionHistory,
    matchSuggestionHistory,
    NEW_HISTORY,
    REMOVE_HISTORY,
    subscribeHistoryChange,
} from './suggestionHistory'

export {
    isEnterKey,
    isArrowDownKey,
    isArrowUpKey,
    nop,
    useDefaultProps,
    matchSuggestionHistory,
    getSuggestionHistory,
    setSuggestionHistory,
    removeSuggestionHistory,
    searchSuggestions,
    debounce,
    NEW_HISTORY,
    REMOVE_HISTORY,
    subscribeHistoryChange
}