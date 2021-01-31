import { defaultPagesize } from './tableKeys';

export function setPagesize(tableKey, pagesize) {
    const userName = localStorage.getItem('userName');
    const schemaName = localStorage.getItem('schemaName');
    const localKey = `${schemaName}.${userName}.pagesize`;
    const pagesizeString = localStorage.getItem(localKey);
    let pagesizeData = pagesizeString ? JSON.parse(pagesizeString) : {};
    pagesizeData[tableKey] = pagesize;
    localStorage.setItem(localKey, JSON.stringify(pagesizeData));
}

export function getPagesize(tableKey) {
    const userName = localStorage.getItem('userName');
    const schemaName = localStorage.getItem('schemaName');
    const pagesizeString = localStorage.getItem(`${schemaName}.${userName}.pagesize`);
    const pagesizeData = pagesizeString ? JSON.parse(pagesizeString) : defaultPagesize;
    return pagesizeData[tableKey] ? pagesizeData[tableKey] : defaultPagesize[tableKey];
}