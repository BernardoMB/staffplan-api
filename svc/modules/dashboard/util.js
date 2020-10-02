const { MAX_FTE_ALLOCATION, MIN_FTE_ALLOCATION } = require('../../common/const');

module.exports = {
    /** 
     * groups result as [staff_id: number] = {
     * STAFF_ID: number,
     * ROLE_NAME: 'Assistant Superintendent',
     * GROUP_ID: number[],
     * ALLOCATION: number
     * }
     */
    groupOverUnderCount(queryResult) {
        const overUnderHash = {}
        queryResult.forEach(el => {
            if (!overUnderHash[el.STAFF_ID]) {
                overUnderHash[el.STAFF_ID] = {
                    STAFF_ID: 1,
                    ROLE_NAME: 'Assistant Superintendent',
                    GROUP_ID: [],
                    ALLOCATION: 0
                }
            }
            overUnderHash[el.STAFF_ID].ALLOCATION += el.ALLOCATION;
            overUnderHash[el.STAFF_ID].GROUP_ID.push(el.GROUP_ID);
        })
        return overUnderHash;
    },
    getOverUnderCount(queryResult, projectGroup) {
        const overUnderHash = this.groupOverUnderCount(queryResult)
        let overUnderCount = 0;
        for (let id in overUnderHash) {
            if (
                (projectGroup === 'All' || overUnderHash[id].GROUP_ID.includes(projectGroup))
                &&
                (overUnderHash[id].ALLOCATION > MAX_FTE_ALLOCATION || overUnderHash[id].ALLOCATION < MIN_FTE_ALLOCATION)
            ) {
                overUnderCount++
            }
        }
        return overUnderCount;
    }
}