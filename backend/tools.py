import requests
from fastapi import APIRouter

router = APIRouter()


@router.get("/fasta_ncbi/")
def get_Fasta_from_NCBI(NCBI_ID):
    
    for i in range(5):
        reqUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=" + \
            NCBI_ID+"&rettype=fasta&retmode=text"
        response = requests.request("GET", reqUrl)
        if len("".join(response.text.split("\n")[1:])) > 0:
            break
        else:
            pass
            # print("Retrying...")

    return "".join(response.text.split("\n")[1:]), reqUrl