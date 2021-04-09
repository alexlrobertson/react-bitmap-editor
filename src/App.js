import {useState} from "react";
import styled from 'styled-components'

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
  background: ${({active}) => active ? 'black' : 'white'};

  &:hover {
    background: ${({active}) => active ? 'lightgray' : 'darkgray'};
  }`;

function App() {
    const [pixels, setPixels] = useState(getInitialPixels());

    return (
        <table style={{width: 400, height: 200, border: '1px solid red'}} cellPadding={0}
               cellSpacing={0}>
            <tbody>
            {pixels.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((pixel, columnIndex) => (
                        <Pixel key={columnIndex} active={pixel}
                               onClick={() => {
                                   setPixels(pixels.map((row, index) => {
                                       if (index !== rowIndex) {
                                           return row;
                                       }
                                       return row.map((pixel, index) => {
                                           if (index !== columnIndex) {
                                               return pixel;
                                           }
                                           return !pixel;
                                       });
                                   }));
                               }}>{pixel}</Pixel>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default App;
