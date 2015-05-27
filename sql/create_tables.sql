CREATE TABLE selitykset (
    id              SERIAL PRIMARY KEY,
    selitys         TEXT NOT NULL
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

