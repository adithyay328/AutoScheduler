function Title({style, size, text, weight}) {
    return (
        <h2 style={{...style, fontSize: `${size}em`, fontWeight: weight, margin: 0}}>{text}</h2>
    )
}

export default Title;