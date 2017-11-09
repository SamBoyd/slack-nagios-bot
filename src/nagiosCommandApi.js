import {
    constructAcknowledgeCommand,
    constructServiceDowntimeCommand,
    constructHostDowntimeCommand
} from './commandBuilder'
import {sendPost} from './nagiosRequest'

export const acknowledgeService = (host, service, cb) => {
    const sendAcknowledgeCommand = constructAcknowledgeCommand(sendPost);

    sendAcknowledgeCommand(host, service, cb)
};


export const scheduleDowntimeForService = (host, service, downtime, cb) => {
    const sendDowntimeCommand = constructServiceDowntimeCommand(sendPost);

    sendDowntimeCommand(host, service, downtime, cb)
};

export const scheduleDowntimeForHost = (host, downtime, cb) => {
    const sendDowntimeCommand = constructHostDowntimeCommand(sendPost);

    sendDowntimeCommand(host, downtime, cb)
};