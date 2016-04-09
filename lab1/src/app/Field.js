import React from 'react'

const styles = {
    container: {
        width: '100%'
    },
    title: {
        margin: 0,
        float: 'left',
        width: '35%',
        height: 48,
        lineHeight: '48px',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'right'
    },
    content: {
        float: 'right',
        width: '60%'
    },
    clear: {
        width: '100%',
        clear: 'both'
    }
}

class Field extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div style={styles.container}>
                <h3 style={styles.title}>{this.props.title}</h3>
                <div style={styles.content}>{this.props.children}</div>
                <div style={styles.clear}></div>
            </div>
        )
    }
}

export default Field
