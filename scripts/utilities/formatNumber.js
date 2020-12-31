export default function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}
