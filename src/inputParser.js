export const parseInputForAcknowledge = (m) => {
    const patternString = /acknowledge (.+(?=on))on (.+)/gi;
    let patt = new RegExp(patternString);

    let message = m;
    let bool = patt.test(message);

    if (bool) {
        var matches = patternString.exec(message);

        if (matches.length == 0) {
            return {
                'error': 'Invalid acknowledgement'
            }
        }

        return {
            'service': matches[1].trim(),
            'host': matches[2].trim()
        }
    } else {
        return {
            'error': 'Invalid acknowledgement'
        }
    }
};

export const parseInputForDowntime = (m) => {
    let result = parseInputForDowntimeOnService(m);

    if ('error' in result) {
        result = parseInputForDowntimeOnHost(m)
    }

    return result
};

const parseInputForDowntimeOnService = (m) => {
    const patternString = /schedule downtime for (.+(?=on))on (.+(?=for))for (.+)/gi;
    let patt = new RegExp(patternString);

    let message = m;
    let inputMatchesServiceDowntime = patt.test(message);

    if (inputMatchesServiceDowntime) {
        var matches = patternString.exec(message);

        if (matches.length == 0) {
            return {
                'error': 'Invalid acknowledgement'
            }
        }

        return {
            'service': matches[1].trim(),
            'host': matches[2].trim(),
            'duration': matches[3].trim()
        }
    } else {
        return {
            'error': 'Invalid acknowledgement'
        }
    }
};

const parseInputForDowntimeOnHost = (m) => {
    const patternString = /schedule downtime on (.+(?=for))for (.+)/gi;
    let patt = new RegExp(patternString);

    let message = m;
    let inputMatchesServiceDowntime = patt.test(message);

    if (inputMatchesServiceDowntime) {
        var matches = patternString.exec(message);

        if (matches.length == 0) {
            return {
                'error': 'Invalid acknowledgement'
            }
        }

        return {
            'host': matches[1].trim(),
            'duration': matches[2].trim()
        }
    } else {
        return {
            'error': 'Invalid acknowledgement'
        }
    }
};