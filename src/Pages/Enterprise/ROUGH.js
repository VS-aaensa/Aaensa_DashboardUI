const EnterpriseModel = require('../../models/enterprise.model');
// const EnterpriseUserModel = require('../../models/enterprise_user.model');
// const EnterpriseStateModel = require('../../models/enterprise_state.model');
// const EnterpriseStateLocationModel = require('../../models/enterprise_state_location.model');
const GatewayModel = require('../../models/gateway.model');
const OptimizerLogModel = require('../../models/OptimizerLog.model');
const GatewayLogModel = require('../../models/GatewayLog.model');


exports.AllDataLog = async (req, res) => {
    const { enterprise_id, gateway_id, state_id, location_id, time_stamp, time_interval } = req.body;

    try {
        if (enterprise_id) {
            const Enterprise = await EnterpriseModel.find({ _id: enterprise_id });

            if (!Enterprise || Enterprise.length === 0) {
                return res.status(404).json({ success: false, message: 'Enterprise not found' });
            }

            const query = location_id ? { EnterpriseInfo: location_id } : {};
            const AllGetwayData = await GatewayModel.find(query).populate({
                path: 'EnterpriseInfo',
                match: {
                    'Enterprise_ID': enterprise_id,
                    'State_ID': state_id ? state_id : null
                }
            });

            const GatewaysWithOptimizerLogs = await Promise.all(AllGetwayData.map(async (gateway) => {
                const GatewayLogs = await GatewayLogModel.findOne(
                    { GatewayID: gateway_id ? gateway_id : gateway._id },
                    { Phases: 1, KVAH: 1, KWH: 1, PF: 1, _id: 0 }
                );

                let timeFilter = {};
                if (time_interval === '1s') {
                    timeFilter = { TimeStamp: { $gte: new Date(Date.now() - 1000) } };
                } else if (time_interval === '5s') {
                    timeFilter = { TimeStamp: { $gte: new Date(Date.now() - 5000) } };
                } else if (time_interval === '1h') {
                    timeFilter = { TimeStamp: { $gte: new Date(Date.now() - 3600000) } };
                } else if (time_interval === '2h') {
                    timeFilter = { TimeStamp: { $gte: new Date(Date.now() - 7200000) } };
                }

                const OptimizerLogsForGateway = await OptimizerLogModel.find(
                    {
                        GatewayID: gateway._id,
                        ...(time_stamp ? { TimeStamp: time_stamp } : {}),
                        ...timeFilter
                    },
                    { TimeStamp: 1, RoomTemperature: 1, Humidity: 1, CoilTemperature: 1, OptimizerID: 1, OptimizerMode: 1, _id: 0 }
                );

                // Transform OptimizerLogsForGateway array to include only specific fields
                const TransformedOptimizerLogs = OptimizerLogsForGateway.map(log => ({
                    TimeStamp: log.TimeStamp,
                    RoomTemperature: log.RoomTemperature,
                    Humidity: log.Humidity,
                    CoilTemperature: log.CoilTemperature,
                    OptimizerID: log.OptimizerID,
                    OptimizerMode: log.OptimizerMode
                }));

                const gatewayData = { Enterprise, GatewayID: gateway.GatewayID, OptimizerLogDetails: TransformedOptimizerLogs, ...GatewayLogs?._doc };
                return gatewayData;
            }));

            // Filter out gateways without OptimizerLogDetails and GatewayLogs._doc
            const filteredGateways = GatewaysWithOptimizerLogs.filter(gateway => gateway.OptimizerLogDetails.length > 0);
            return res.status(200).json({ success: true, message: 'Data fetched successfully', data: filteredGateways });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error', err: error.message });
    }
};

exports.AllDataLogDemo = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10; // Set your preferred page size

        const lookUpQuery = {
            from: 'optimizerlogs',
            localField: '_id',
            foreignField: 'GatewayLogID',
            as: 'OptimizerLogDetails'
        };

        const projectQuery = {
            _id: 1,
            GatewayID: 1,
            Phases: 1,
            KVAH: 1,
            KWH: 1,
            PF: 1,
            isDelete: 1,
            OptimizerLogDetails: {
                $map: {
                    input: '$OptimizerLogDetails',
                    as: 'optimizer',
                    in: {
                        OptimizerID: '$$optimizer.OptimizerID',
                        GatewayID: '$$optimizer.GatewayID',
                        GatewayLogID: '$$optimizer.GatewayLogID',
                        TimeStamp: '$$optimizer.TimeStamp',
                        RoomTemperature: '$$optimizer.RoomTemperature',
                        Humidity: '$$optimizer.Humidity',
                        CoilTemperature: '$$optimizer.CoilTemperature',
                        OptimizerMode: '$$optimizer.OptimizerMode',
                        isDelete: '$$optimizer.isDelete'
                    }
                }
            }
        };

        const skip = (page - 1) * pageSize;

        const allData = await GatewayLogModel.aggregate([
            {
                $lookup: lookUpQuery
            },
            {
                $project: projectQuery
            },
            {
                $skip: skip
            },
            {
                $limit: pageSize
            }
        ]);

        return res.status(200).json({ success: true, message: 'Data fetched successfully', data: allData });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error', err: error.message });
    }
};
