/**
 * Format giá coin tùy theo giá trị
 * - Giá lớn hơn hoặc bằng 1 thì hiển thị 2 chữ số thập phân
 * - Giá nhỏ hơn 1 thì tăng số chữ số thập phân để giữ độ chính xác, tối đa 8 chữ số thập phân
 * - Giá rất nhỏ (ví dụ < 0.00000001) hiển thị dạng khoa học (scientific notation)
 * @param {number|string} price Giá coin cần format
 * @returns {string} Giá đã format đẹp
 */
function formatCoinPrice(price) {
  if (price === null || price === undefined || price === '') return '-';

  let num = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(num)) return '-';

  if (num === 0) return '0';

  if (num >= 1) {

    return num.toFixed(2);
  } else if (num >= 0.00000001) {
    let precision = 4;
    while (precision <= 8 && Number(num.toFixed(precision)) === 0) {
      precision++;
    }

    return num.toFixed(precision);
  } else {
    return num.toExponential(2);
  }
}

export default formatCoinPrice;
