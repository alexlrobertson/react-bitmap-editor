import {useState} from "react";

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

function App() {
    const [pixels, setPixels] = useState(getInitialPixels());

    return (
        <table style={{width: 400, height: 200, border: '1px solid red'}}>
            <tbody>
            {pixels.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((pixel, columnIndex) => (
                        <td key={columnIndex} style={{background: pixel ? 'black' : 'white', padding: 0}}
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
                            }}>{pixel}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default App;
