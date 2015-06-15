CREATE TABLE tekijat (
    id              SERIAL PRIMARY KEY,
    nimi            TEXT NOT NULL CONSTRAINT epatyhja_tekijan_nimi CHECK (length(nimi) > 0)
);

CREATE TABLE selitykset (
    id              SERIAL PRIMARY KEY,
    selitys         TEXT NOT NULL,
    tekija          INTEGER NOT NULL REFERENCES tekijat ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE hakusanat (
    id              SERIAL PRIMARY KEY,
    hakusana        TEXT NOT NULL CONSTRAINT epatyhja_hakusana CHECK (length(hakusana) > 0),
    selitys         INTEGER NOT NULL REFERENCES selitykset ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE linkit (
    id              SERIAL PRIMARY KEY,
    selitys         INTEGER NOT NULL REFERENCES selitykset ON DELETE CASCADE ON UPDATE CASCADE,
    hakusana        INTEGER NOT NULL REFERENCES hakusanat ON DELETE CASCADE ON UPDATE CASCADE,
    linkkisana      TEXT NOT NULL CONSTRAINT epatyhja_linkki CHECK (length(linkkisana) > 0)
);

