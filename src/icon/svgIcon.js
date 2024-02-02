const SVG = ({
    className = '',
    style = {},
    fill = 'currentColor',
    width = '16',
    height = '16',
    viewBox = `0 0 ${width} ${height}`,
    children
}) =>
    <svg
        className={className}
        style={style}
        fill={fill}
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="htpp://www.w3.org/1999/xlink"
    >
        {children}
    </svg>
export default SVG
