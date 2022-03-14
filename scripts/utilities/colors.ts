import Color from 'color';

export function checkIfColorGoodContrast(
    textColor: string,
    backgroundColor: string
) {
    const colorContrastScore = Color(textColor).level(Color(backgroundColor));
    const isColorGoodContrast = ['AA', 'AAA'].includes(colorContrastScore);
    return isColorGoodContrast;
}
