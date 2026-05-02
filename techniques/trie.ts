class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  public insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  // exact match.
  public search(word: string): boolean {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }

    // this ensure exact match or not.
    return current.isEndOfWord;
  }

  public startsWith(prefix: string): boolean {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }

    return true;
  }

  public autoComplete(prefix: string): string[] {
    let current = this.root;
    const results: string[] = [];

    // go to the end of the prefix first
    for (const char of prefix) {
      if (!current.children.has(char)) {
        // no words start with this prefix.
        return results;
      }
      current = current.children.get(char)!;
    }

    // DFS all the children nodes.
    this.findWordsFromNode(current, prefix, results);

    return results;
  }

  private findWordsFromNode(
    currentNode: TrieNode,
    prefix: string,
    results: string[],
  ): void {
    if (currentNode.isEndOfWord) {
      results.push(prefix);
    }

    for (const [char, charNode] of currentNode.children.entries()) {
      this.findWordsFromNode(charNode, prefix + char, results);
    }
  }
}

// Demonstration
const myTrie = new Trie();

// Seed data
const dictionary = ["cat", "car", "cart", "dog", "dove", "door", "dart"];
dictionary.forEach((word) => myTrie.insert(word));

console.log("Exact Search 'car':", myTrie.search("car")); // true
console.log("Exact Search 'ca':", myTrie.search("ca")); // false (it's a prefix, not a word)
console.log("Prefix 'do':", myTrie.startsWith("do")); // true

// Autocomplete action
console.log("Autocomplete 'ca':", myTrie.autoComplete("ca"));
// Output: [ 'cat', 'car', 'cart' ]

console.log("Autocomplete 'do':", myTrie.autoComplete("do"));
// Output: [ 'dog', 'dove', 'door' ]
