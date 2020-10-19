export default {
    namespaced: true,
    state: {
        feature: '',
        anova_res: {
            d1: 0,
            d2: 0,
            f: 0,
            p: 0,
            w2: 0
        }
    },
    mutations: {
        setAnovaResult(state, { feature, data }) {
            state.anova_res = data
            state.feature = feature
        }
    },
    actions: {},
    getters: {
        getAnovaResult: state => {
            const body = [
                ['F(' + state.anova_res.d1 + ',' + state.anova_res.d2 + ')', state.anova_res.f],
                ['p', state.anova_res.p],
                // ['Effect size(w2)', state.anova_res.w2]
            ]
            return { feature: state.feature, body: body }
        }
    }
}
