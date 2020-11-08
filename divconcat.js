// divItem :: (int, string) -> (int, string) -> string
// Inputs: an integer divisor and an output string
// Output: a function taking a number and an output
//   "accumulator", and returning either the concatenation
//   of the accumulator and the output string, if the
//   the number is exactly divisible by the divisor, or
//   just the accumulator otherwise.
export default function divItem(d, o) {
  return (n, s) => n % d === 0 ? s + o : s;
}
