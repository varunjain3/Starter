from hashlib import new
from xmlrpc.client import Boolean, boolean
import requests as req
from bs4 import BeautifulSoup as bs
from tools import get_Fasta_from_NCBI
import requests
from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter()


class QGRSParameters(BaseModel):
    Enabled: bool = True
    QGRSmax: int = 45
    GGroupmin: int = 2
    loop_min: int = 0
    loop_max: int = 36


def numg_calc(seq):
    numg = None
    score = []
    i = 0

    while i < len(seq):
        if seq[i] == "G":
            t = 0
            while(seq[t+i]) == "G":
                t += 1

                if t+i >= len(seq):
                    break

            score += [t]
            i += t
        else:
            score += [0]
            i += 1

    main_score = score

    for i in range(4, 0, -1):
        count = 0
        for j in score:
            if j == i:
                count += 1
        if count >= 4:
            numg = i
            break
        else:
            temp = []
            j = 0
            for j in range(len(main_score)):
                if main_score[j] >= i and i > 1:
                    temp += [i-1]*(main_score[j]//(i-1))

                else:
                    temp += [main_score[j]]

            score = temp

    if numg is None:
        return 0
    else:
        return numg


@router.post("/qgrs_ncbi/")
def get_QGRS_NCBI(NCBI_ID, parameters: QGRSParameters):

    # make request to the server for an ID
    seq, url = get_Fasta_from_NCBI(NCBI_ID)
    results = {"NCBI Reference Number": NCBI_ID,
               "fasta": seq,
               "fasta_url": url}

    data = {"sequence": seq, "table": []}

    parameters = parameters.dict()
    parameters = {str(k).lower(): str(v).lower()
                  for k, v in parameters.items()}

    inputURL = "https://bioinformatics.ramapo.edu/QGRS/analyze.php"
    r = req.post(inputURL, data=data, cookies=parameters)

    # parse response from server, get link for "QGRS sequences without overlaps"
    # that contains the table we're interested in
    soup = bs(r.text, 'html.parser')
    # print("".join(soup.findAll('font')[1].strings))  # to confirm search parameters
    link = soup.body.find('img', {"src": "data.gif"}).parent
    baseURL = "https://bioinformatics.ramapo.edu/QGRS/dataview.php/"
    outputURL = baseURL+link['href']

    results["tableURL"] = outputURL

    # visit the link and get table
    r = req.get(outputURL)
    soup = bs(r.text, 'html.parser')
    table = soup.find('table')

    # count number of 2G,3G,4G,5G,6G sequences
    table_rows = table.find_all('tr')[1:]
    gees = [0, 0, 0, 0, 0, 0, 0]

    count = 1
    for tr in table_rows:
        table_data = tr.find_all('td')
        seq = table_data[2]
        new_seq = ""
        flag = False
        for char in str(seq):
            if char == "<":
                flag = True
            if char == ">":
                flag = False
                continue

            if not flag:
                new_seq += char

        num_g = numg_calc(new_seq)
        seq_len = table_data[1].text
        start_pos = table_data[0].text

        package = {
            "sequence": new_seq,
            "length": seq_len,
            "start_pos": start_pos,
            "num_g": num_g,
            "id": count
        }
        count += 1
        data['table'].append(package)

        gees[len(seq.find_all('u')[0].text)] += 1

    results["# of 2g"] = gees[2]
    results["# of 3g"] = gees[3]
    results["# of 4g"] = gees[4]
    if gees[5] > 0:
        print(f"5g sequence found, please check manually for: {NCBI_ID}")
        # raise Exception("5g sequence found")
        results["# of 5g"] = gees[5]
    if gees[6] > 0:
        raise Exception("6g sequence found")
        results["# of 6g"] = gees[6]

    results['table'] = data["table"]
    return results


@router.post("/qgrs_seq/")
def get_QGRS_Sequence(seq, parameters: QGRSParameters):
    """
    seq: string (ATGC)
    parameters: dict of parameters to be sent to QGRS server
    """

    # make request to the server for an ID
    results = {"fasta": seq, }
    data = {"sequence": seq}

    parameters = parameters.dict()
    parameters = {str(k).lower(): str(v).lower()
                  for k, v in parameters.items()}

    inputURL = "https://bioinformatics.ramapo.edu/QGRS/analyze.php"
    r = req.post(inputURL, data=data, cookies=parameters)

    # parse response from server, get link for "QGRS sequences without overlaps"
    # that contains the table we're interested in
    soup = bs(r.text, 'html.parser')
    # print("".join(soup.findAll('font')[1].strings))  # to confirm search parameters
    link = soup.body.find('img', {"src": "data.gif"}).parent
    baseURL = "https://bioinformatics.ramapo.edu/QGRS/dataview.php/"
    outputURL = baseURL+link['href']

    results["tableURL"] = outputURL

    # visit the link and get table
    r = req.get(outputURL)
    soup = bs(r.text, 'html.parser')
    table = soup.find('table')
    data['table'] = []

    # count number of 2G,3G,4G,5G,6G sequences
    table_rows = table.find_all('tr')[1:]
    gees = [0, 0, 0, 0, 0, 0, 0]
    count = 1
    for tr in table_rows:
        table_data = tr.find_all('td')
        seq = table_data[2]
        new_seq = ""
        flag = False
        for char in str(seq):
            if char == "<":
                flag = True
            if char == ">":
                flag = False
                continue

            if not flag:
                new_seq += char

        num_g = numg_calc(new_seq)
        seq_len = table_data[1].text
        start_pos = table_data[0].text

        package = {
            "sequence": new_seq,
            "length": seq_len,
            "start_pos": start_pos,
            "num_g": num_g,
            "id":count
        }
        count += 1

        data['table'].append(package)

    results["# of 2g"] = gees[2]
    results["# of 3g"] = gees[3]
    results["# of 4g"] = gees[4]
    if gees[5] > 0:
        print(f"5g sequence found.")
        # raise Exception("5g sequence found")
        results["# of 5g"] = gees[5]
    if gees[6] > 0:
        raise Exception("6g sequence found")
        results["# of 6g"] = gees[6]

    results['table'] = data['table']
    return results
