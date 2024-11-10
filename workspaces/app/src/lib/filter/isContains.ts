type Params = {
  query: string;
  target: string;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  // localeCompareを使って比較する
  for (let i = 0; i < target.length - query.length + 1; i++) {
    if (target.slice(i, i + query.length).localeCompare(query, 'ja', { sensitivity: 'accent' }) === 0) {
      return true;
    }
  }

  return false;
}
