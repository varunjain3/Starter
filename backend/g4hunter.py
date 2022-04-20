from pydantic import BaseModel
import numpy as np

from tools import get_Fasta_from_NCBI
from fastapi import APIRouter

router = APIRouter()


def calculate_g4hunter_score(seq):
    window_size = len(seq)
    count = 0
    j = 0
    temp = []

    while j < (window_size):
        e = seq[j]

        temp_count = 1

        if e == "G":
            for k in range(j+1, window_size):
                if seq[k] == "G":
                    temp_count += 1
                else:
                    j = k - 1
                    break
            else:
                j = window_size
            temp += [min(temp_count, 4) for i in range(temp_count)]

        elif e == 'C':
            for k in range(j+1, window_size):
                if seq[k] == "C":
                    temp_count += 1
                else:
                    j = k - 1
                    break
            else:
                j = window_size

            temp += [-min(temp_count, 4) for i in range(temp_count)]
        else:
            temp += [0]
        j += 1
    return temp


class G4Hunter(BaseModel):
    window_size: int = 25
    threshold: float = 1.2

@router.post("/g4hunter/")
def get_g4hunter_data(NCBI_ID, paramters:G4Hunter):

    window_size = paramters['window_size']
    threshold = paramters['threshold']

    # make request to the server for an ID
    seq, url = get_Fasta_from_NCBI(NCBI_ID)
    results = {"NCBI Reference Number": NCBI_ID,
               "fasta": seq,
               "fasta_url": url}

    sequence_hunter = {}
    seq_sqore = calculate_g4hunter_score(seq)

    for i in range(len(seq)-window_size + 1):
        count = sum(seq_sqore[i:i+window_size])/window_size
        if abs(count) >= threshold:
            sequence_hunter[i] = count

    # consensus sequence

    start = None
    last = None
    consensus_seq = {}

    for start_position in sequence_hunter:
        if start is None:
            start = start_position
            last = start_position
        elif start_position - 1 == last:
            last = start_position
        else:
            new_seq = seq[start:last+window_size]
            new_seq_score = sum(seq_sqore[start:last+window_size])/len(new_seq)

            consensus_seq[start] = {"sequence": new_seq,
                                    "score": new_seq_score,
                                    "len": len(new_seq), }
            start = start_position
            last = start_position

    return consensus_seq


if __name__ == "__main__":
    get_g4hunter_data("NR_152759.1")
    get_g4hunter_data("NR_024031.2")
    calculate_g4hunter_score("GTGGTGTTTGTGGGCACGAGAGGGG")
