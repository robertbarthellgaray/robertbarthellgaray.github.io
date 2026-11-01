import assert from 'node:assert/strict';
import {SOLVER_TRANSLATIONS, getSolverTranslation} from '../src/rolamgasTranslations.js';

assert.deepEqual(Object.keys(SOLVER_TRANSLATIONS).sort(),['de','en','es','fr','hi','ru','zh']);
const keys=Object.keys(SOLVER_TRANSLATIONS.en).sort();
for(const [language,text] of Object.entries(SOLVER_TRANSLATIONS)){
    assert.deepEqual(Object.keys(text).sort(),keys,`${language}: missing section copy`);
    assert.equal(text.steps.length,4);
    assert.deepEqual(Object.keys(text.metricLabels).sort(),Object.keys(SOLVER_TRANSLATIONS.en.metricLabels).sort());
    for(const [key,value] of Object.entries(text)){
        if(typeof value==='string') assert(value.trim()&&!value.includes('\ufffd'),`${language}: invalid ${key}`);
    }
    for(const step of text.steps) assert(step.length===2&&step.every(s=>typeof s==='string'&&s.trim()));
    if(language!=='en'){
        assert.equal(text.missions.length,4);
        for(const mission of text.missions) for(const key of ['title','dates','description','note']) assert(mission[key]?.trim(),`${language}: missing ${key}`);
        for(const quantity of ['479','412.4','2.060']) assert(JSON.stringify(text.missions[1]).includes(quantity),`${language}: changed Cassini quantity ${quantity}`);
        for(const quantity of ['899.7','200','ba36e139b812']) assert(text.missions[3].note.includes(quantity),`${language}: changed Mercury quantity ${quantity}`);
        assert(text.missions[3].dates.includes('2034')&&text.missions[3].dates.includes('2037'));
    }
}
assert.equal(getSolverTranslation('unknown'),SOLVER_TRANSLATIONS.en);
console.log('Seven complete languages: four missions, four method steps, matching metric labels and unchanged technical quantities.');
