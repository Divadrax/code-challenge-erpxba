export default function divConcat(d, o) {
  return (n, s) => n % d === 0 ? s + o : s;
}
