export default function SuggestionItem({
    onClick,
    onRemove,
    imgUrl,
    title
}) {
    onClick = !onClick ? () => {} : onClick
    onRemove = !onRemove ? () => {} : onRemove
    imgUrl = !imgUrl ? '' : imgUrl
    title = !title ? '' : title
    
    
}