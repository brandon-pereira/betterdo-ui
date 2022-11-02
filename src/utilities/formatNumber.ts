export default function formatNumber(number: number): string {
    return new Intl.NumberFormat().format(number);
}
