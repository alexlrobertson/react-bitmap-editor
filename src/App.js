import {useState} from "react";
import styled from "styled-components";

const getInitialPixels = () => {
    const pixels = [];

    for (let i = 0; i < 16; i++) {
        const row = [];
        for (let j = 0; j < 32; j++) {
            row.push(false);
        }
        pixels.push(row);
    }
    return pixels;
};

const Pixel = styled.td`
  background: ${({active}) => (active ? "black" : "white")};

  &:hover {
    background: ${({active}) => (active ? "lightgray" : "darkgray")};
  }
`;

const toHex = (number) => {
    if (number < 10) {
        return number.toString();
    }
    return ['a', 'b', 'c', 'd', 'e', 'f'][number - 10]
};

function App() {
    const [images, setImages] = useState([]);
    const [pixels, setPixels] = useState(getInitialPixels());

    return (
        <>
            <table
                style={{width: 400, height: 200, border: "1px solid red"}}
                cellPadding={0}
                cellSpacing={0}
            >
                <tbody>
                {pixels.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((pixel, columnIndex) => (
                            <Pixel
                                key={columnIndex}
                                active={pixel}
                                onClick={() => {
                                    setPixels(
                                        pixels.map((row, index) => {
                                            if (index !== rowIndex) {
                                                return row;
                                            }
                                            return row.map((pixel, index) => {
                                                if (index !== columnIndex) {
                                                    return pixel;
                                                }
                                                return !pixel;
                                            });
                                        })
                                    );
                                }}
                            >
                                {pixel}
                            </Pixel>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => {
                setImages(images.concat([pixels]));
            }}>Save
            </button>
            <button onClick={() => setPixels(getInitialPixels())}>Clear</button>
            <ul>
                {images.map((pixels) => <button onClick={() => {
                    setPixels(pixels);
                }}>Load</button>)}
            </ul>
            <pre>{pixels.map((row, rowIndex) => row.map((pixel, columnIndex) => pixel ? `x${columnIndex}y${rowIndex}` : null).filter(a => a).join(',')).filter(a => a).join()}</pre>
            <pre>{pixels.map((row, rowIndex) => row.map((pixel, columnIndex) => pixel ? `${columnIndex.toString(16)},${rowIndex.toString(16)}` : null).filter(a => a).join(';')).filter(a => a).join(';')}</pre>
        </>
    );
}

export default App;
