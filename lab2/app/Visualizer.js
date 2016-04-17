import React from 'react'

const styles = {
    canvas: {
        width: '100%',
        height: 200
    }
}

class Visualizer extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            type: 'bar'
        }

        this.changeType = this.changeType.bind(this)
    }

    changeType() {
        const table = {
            wave: 'bar',
            bar: 'wave'
        }
        this.setState({type: table[this.state.type]})
    }

    componentDidMount() {
        const analyser = this.props.analyser
        const canvas = this.refs.canvas.getContext('2d')
        const WIDTH = this.refs.canvas.width
        const HEIGHT = this.refs.canvas.height

        analyser.fftSize = 2048
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        canvas.clearRect(0, 0, WIDTH, HEIGHT)

        const draw = () => {
            const drawVisual = requestAnimationFrame(draw)
            canvas.fillStyle = 'rgb(200,200,200)'
            canvas.fillRect(0, 0, WIDTH, HEIGHT)
            switch (this.state.type) {
                case 'wave': {
                    analyser.getByteTimeDomainData(dataArray)

                    canvas.lineWidth = 1
                    canvas.strokeStyle = 'rgb(0, 0, 0)'
                    canvas.beginPath()

                    const sliceWidth = WIDTH / bufferLength
                    let x = 0, y = 0
                    for (let i = 0; i < bufferLength; i++) {
                        y = 1.0 * dataArray[i] * HEIGHT / 256
                        canvas[i?'lineTo':'moveTo'](x, y)
                        x += sliceWidth
                    }

                    canvas.lineTo(WIDTH, HEIGHT / 2)
                    canvas.stroke()
                    break
                }
                case 'bar': {
                    analyser.getByteFrequencyData(dataArray)

                    const barWidth = WIDTH / bufferLength * 10
                    let x = 0, y = 0
                    for (let i = Math.floor(bufferLength * 0.1); i < bufferLength; i+=8) {
                        y = dataArray[i]
                        canvas.fillStyle = `rgb(${y+40}, 50, 50)`
                        canvas.fillRect(x, HEIGHT-y/2, barWidth, y)
                        x += barWidth + 1
                    }
                    break
                }
            }
        }

        draw()
    }

    render() {
        return (
            <canvas ref="canvas" width={600} height={200} style={styles.canvas}
                    onClick={this.changeType} />
        )
    }
}

export default Visualizer
