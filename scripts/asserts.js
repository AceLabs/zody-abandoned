function assert(actual, expected, msg) {
    if (expected !== actual)
        print(msg || 'expected ' + expected + ', but got ' + actual);
}