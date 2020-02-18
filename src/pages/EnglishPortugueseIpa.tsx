import React from 'react';
import useStyles from './EnglishPortugueseIpa.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const EnglishPortugueseIpa = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography gutterBottom variant="h5" component="h2">
        Consoantes
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IPA</TableCell>
            <TableCell>Inglês</TableCell>
            <TableCell>Português</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>b</TableCell>
            <TableCell>
              <b>b</b>uy, <b>c</b>ab
            </TableCell>
            <TableCell>
              <b>b</b>eiço, âm<b>b</b>ar, so<b>b</b>, ca<b>b</b>eça, so<b>b</b>
              re
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>d</TableCell>
            <TableCell>
              <b>d</b>ye, ca<b>d</b>, la<b>dd</b>er
            </TableCell>
            <TableCell>
              ce<b>d</b>o, i<b>d</b>ade, <b>d</b>edo, len<b>d</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>dj</TableCell>
            <TableCell>
              <b>d</b>ew
            </TableCell>
            <TableCell>
              <b>d</b>ia
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>dʒ</TableCell>
            <TableCell>
              <b>g</b>iant, ba<b>dg</b>e
            </TableCell>
            <TableCell>
              <b>d</b>igo, an<b>d</b>e, bal<b>d</b>e
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ð</TableCell>
            <TableCell>
              <b>th</b>y, brea<b>th</b>e, fa<b>th</b>er
            </TableCell>
            <TableCell>
              <b>~~~</b> como o d, mas com a língua encostando nos dentes de
              cima, ou, se aproximante, sem encostar no céu da boca (ficando
              entre D e Z)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>f</TableCell>
            <TableCell>
              <b>f</b>an, lea<b>f</b>
            </TableCell>
            <TableCell>
              <b>f</b>ado, ca<b>f</b>é
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɡ</TableCell>
            <TableCell>
              <b>g</b>uy, ba<b>g</b>
            </TableCell>
            <TableCell>
              <b>g</b>ato, si<b>g</b>no, bin<b>g</b>o, <b>gu</b>erra
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>h</TableCell>
            <TableCell>
              <b>h</b>igh, a<b>h</b>ead
            </TableCell>
            <TableCell>
              ma<b>rr</b>eta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>hw</TableCell>
            <TableCell>
              <b>wh</b>ine <br />
              (Na maioria dos sotaques não é mais usado.{' '}
              <a
                href="https://en.wikipedia.org/wiki/Pronunciation_of_English_%E2%9F%A8wh%E2%9F%A9#Wine.E2.80.93whine_merger"
                target="_blank"
              >
                Referência
              </a>
              )
            </TableCell>
            <TableCell>
              a<b>rr</b>uar
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>j</TableCell>
            <TableCell>
              <b>y</b>es, hallelu<b>j</b>ah
            </TableCell>
            <TableCell>
              sa<b>i</b>a, pa<b>i</b>s
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>k</TableCell>
            <TableCell>
              s<b>k</b>y, <b>c</b>ra<b>ck</b>
            </TableCell>
            <TableCell>
              <b>c</b>or, di<b>c</b>a, <b>qu</b>ente, <b>k</b>iwi
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>l</TableCell>
            <TableCell>
              <b>l</b>ie, s<b>l</b>y, ga<b>l</b>
            </TableCell>
            <TableCell>
              <b>l</b>ua, a<b>l</b>ô
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>lj</TableCell>
            <TableCell>
              <b>l</b>ute
            </TableCell>
            <TableCell>
              <b>Li</b>a, <b>lh</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m</TableCell>
            <TableCell>
              <b>m</b>y, s<b>m</b>ile, ca<b>m</b>
            </TableCell>
            <TableCell>
              <b>m</b>ês, so<b>m</b>o
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>n</TableCell>
            <TableCell>
              <b>n</b>igh, s<b>n</b>ide, ca<b>n</b>
            </TableCell>
            <TableCell>
              <b>n</b>ão, so<b>n</b>o
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>nj</TableCell>
            <TableCell>
              <b>n</b>ew
            </TableCell>
            <TableCell>
              hér<b>ni</b>a, Bós<b>ni</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ŋ</TableCell>
            <TableCell>
              sa<b>ng</b>, si<b>n</b>k, si<b>ng</b>er
            </TableCell>
            <TableCell>???????</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>p</TableCell>
            <TableCell>
              <b>p</b>ie, s<b>p</b>y, ca<b>p</b>
            </TableCell>
            <TableCell>
              <b>p</b>ó, so<b>p</b>a, a<b>p</b>to
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɹ</TableCell>
            <TableCell>
              <b>r</b>ye, t<b>r</b>y, ve<b>r</b>y
            </TableCell>
            <TableCell>
              canta<b>r</b>, abri<b>r</b> (sotaque caipira)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>s</TableCell>
            <TableCell>
              <b>s</b>igh, ma<b>ss</b>
            </TableCell>
            <TableCell>
              <b>s</b>aco, i<b>ss</b>o, bra<b>ç</b>o, má<b>x</b>imo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sj</TableCell>
            <TableCell>
              con<b>s</b>ume
            </TableCell>
            <TableCell>
              <b>ci</b>úme, ma<b>ci</b>eira
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʃ</TableCell>
            <TableCell>
              <b>sh</b>y, ca<b>sh</b>, emo<b>t</b>ion
            </TableCell>
            <TableCell>
              <b>ch</b>ave, a<b>ch</b>ar, <b>x</b>arope, bai<b>x</b>o, su
              <b>sh</b>i
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>t</TableCell>
            <TableCell>
              <b>t</b>ie, s<b>t</b>y, ca<b>t</b>, la<b>tt</b>er
            </TableCell>
            <TableCell>
              <b>t</b>empo, á<b>t</b>omo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>tj</TableCell>
            <TableCell>
              <b>t</b>une
            </TableCell>
            <TableCell>
              sí<b>ti</b>o
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>tʃ</TableCell>
            <TableCell>
              <b>Ch</b>ina, ca<b>tch</b>
            </TableCell>
            <TableCell>
              <b>tch</b>au, a<b>tch</b>im
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>θ</TableCell>
            <TableCell>
              <b>th</b>igh, ma<b>th</b>
            </TableCell>
            <TableCell>
              <b>~~~</b> semelhante ao s pronunciado com a ponta da língua na
              borda dos dentes superiores (como as pessoas que ceceiam)
              <br />
              <br />
              <b>f</b>im, <b>f</b>ato (F mudo)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>θj</TableCell>
            <TableCell>
              en<b>th</b>use
            </TableCell>
            <TableCell>
              <b>~~~</b> a<b>fi</b>ada, epitá<b>fi</b>o
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>v</TableCell>
            <TableCell>
              <b>v</b>ine, lea<b>v</b>e
            </TableCell>
            <TableCell>
              <b>v</b>ela, li<b>v</b>ro
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>w</TableCell>
            <TableCell>
              <b>w</b>ine, s<b>w</b>ine
            </TableCell>
            <TableCell>
              ma<b>l</b>, freq<b>u</b>ente, q<b>u</b>ã<b>o</b>, ma<b>u</b>, Ca
              <b>u</b>ã
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>z</TableCell>
            <TableCell>
              <b>z</b>oo, ha<b>s</b>
            </TableCell>
            <TableCell>
              ca<b>s</b>a, o<b>s</b> amigos, do<b>z</b>e, e<b>x</b>istir
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>zj</TableCell>
            <TableCell>
              <b>Z</b>eus
            </TableCell>
            <TableCell>
              bú<b>zi</b>o, dú<b>zi</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʒ</TableCell>
            <TableCell>
              plea<b>s</b>ure, bei<b>g</b>e
            </TableCell>
            <TableCell>
              <b>j</b>á, <b>g</b>ente
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2">
        Vogais Fortes
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IPA</TableCell>
            <TableCell>Inglês</TableCell>
            <TableCell>Português</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ɑː</TableCell>
            <TableCell>
              P<b>A</b>LM, br<b>a</b>
            </TableCell>
            <TableCell>
              v<b>á</b>, All<b>ah</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɑːr</TableCell>
            <TableCell>
              ST<b>AR</b>T
            </TableCell>
            <TableCell>
              fal<b>ar</b>, Qat<b>ar</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɒ</TableCell>
            <TableCell>
              L<b>O</b>T, bl<b>o</b>ckade
            </TableCell>
            <TableCell>
              p<b>o</b>de, cal<b>o</b>te
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɒr</TableCell>
            <TableCell>
              m<b>or</b>al
            </TableCell>
            <TableCell>
              pud<b>or</b>, p<b>ôr</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>æ</TableCell>
            <TableCell>
              TR<b>A</b>P, t<b>a</b>ttoo
            </TableCell>
            <TableCell>
              p<b>e</b>de
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ær</TableCell>
            <TableCell>
              m<b>arr</b>y
            </TableCell>
            <TableCell>???????</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aɪ</TableCell>
            <TableCell>
              PR<b>I</b>CE, p<b>ie</b>
            </TableCell>
            <TableCell>
              p<b>ai</b>, ab<b>a</b>ixo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aɪər</TableCell>
            <TableCell>
              h<b>ire</b>
            </TableCell>
            <TableCell>
              va<b>iar</b>, desma<b>iar</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aɪ.ər</TableCell>
            <TableCell>
              h<b>igher</b>
            </TableCell>
            <TableCell>
              va<b>iar</b>, desma<b>iar</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aʊ</TableCell>
            <TableCell>
              M<b>OU</b>TH, h<b>ow</b>
            </TableCell>
            <TableCell>
              gr<b>au</b>, c<b>au</b>da
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aʊər</TableCell>
            <TableCell>
              fl<b>our</b>
            </TableCell>
            <TableCell>
              ma<b>u ar</b>gentino
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aʊ.ər</TableCell>
            <TableCell>
              fl<b>ower</b>
            </TableCell>
            <TableCell>
              ma<b>u ar</b>gentino
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɛ</TableCell>
            <TableCell>
              DR<b>E</b>SS, pr<b>e</b>stige
            </TableCell>
            <TableCell>
              m<b>e</b>ta, s<b>é</b>, <b>É</b>merson, caf<b>é</b>zinho
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɛr</TableCell>
            <TableCell>
              m<b>err</b>y
            </TableCell>
            <TableCell>
              Alb<b>er</b>to, of<b>er</b>ta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eɪ</TableCell>
            <TableCell>
              F<b>A</b>CE
            </TableCell>
            <TableCell>
              ac<b>ei</b>te, fech<b>ei</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɛər</TableCell>
            <TableCell>
              SQU<b>ARE</b>, M<b>ar</b>y
            </TableCell>
            <TableCell>
              Alb<b>er</b>to, of<b>er</b>ta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eɪər</TableCell>
            <TableCell>
              pl<b>ayer</b>
            </TableCell>
            <TableCell>
              entr<b>ei ar</b>mado
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɪ</TableCell>
            <TableCell>
              K<b>I</b>T, h<b>i</b>storic
            </TableCell>
            <TableCell>
              cin<b>e</b>, abr<b>e</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɪr</TableCell>
            <TableCell>
              m<b>irr</b>or
            </TableCell>
            <TableCell>
              abr<b>ir</b>, fal<b>ir</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>iː</TableCell>
            <TableCell>
              FL<b>EE</b>CE, pedigr<b>ee</b>, id<b>e</b>a
            </TableCell>
            <TableCell>
              abr<b>i</b>, ju<b>iz</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɪər</TableCell>
            <TableCell>
              N<b>EAR</b>, s<b>er</b>ious
            </TableCell>
            <TableCell>
              abr<b>ir</b>, fal<b>ir</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>iːər</TableCell>
            <TableCell>
              fr<b>eer</b>
            </TableCell>
            <TableCell>
              p<b>íer</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>oʊ</TableCell>
            <TableCell>
              G<b>OA</b>T
            </TableCell>
            <TableCell>
              v<b>ou</b>, am<b>ou</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>oʊər</TableCell>
            <TableCell>
              m<b>ower</b>
            </TableCell>
            <TableCell>
              <b>ou ar</b>pão
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔː</TableCell>
            <TableCell>
              TH<b>OUGHT</b>
            </TableCell>
            <TableCell>
              av<b>ó</b>, abric<b>ó</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔːr</TableCell>
            <TableCell>
              N<b>OR</b>TH, F<b>OR</b>CE
            </TableCell>
            <TableCell>
              h<b>or</b>ta, p<b>or</b>ta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔːər</TableCell>
            <TableCell>
              s<b>awer</b>
            </TableCell>
            <TableCell>
              h<b>or</b>ta, p<b>or</b>ta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔɪ</TableCell>
            <TableCell>
              CH<b>OI</b>CE
            </TableCell>
            <TableCell>
              b<b>oi</b>a, sequ<b>oi</b>a
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔɪər</TableCell>
            <TableCell>
              c<b>oir</b>
            </TableCell>
            <TableCell>
              destr<b>oyer</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɔɪ.ər</TableCell>
            <TableCell>
              empl<b>oyer</b>
            </TableCell>
            <TableCell>
              destr<b>oyer</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʊ</TableCell>
            <TableCell>
              F<b>OO</b>T
            </TableCell>
            <TableCell>
              pul<b>o</b>, mat<b>o</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʊr</TableCell>
            <TableCell>
              c<b>our</b>ier
            </TableCell>
            <TableCell>
              <b>ur</b>na, <b>ur</b>so
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>uː</TableCell>
            <TableCell>
              G<b>OO</b>SE, cr<b>u</b>el
            </TableCell>
            <TableCell>
              <b>ú</b>til, br<b>u</b>ta
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʊər</TableCell>
            <TableCell>
              t<b>our</b>, C<b>URE</b>
            </TableCell>
            <TableCell>
              <b>ur</b>na, <b>ur</b>so
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>uːər</TableCell>
            <TableCell>
              tr<b>uer</b>
            </TableCell>
            <TableCell>
              <b>ur</b>na, <b>ur</b>so
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʌ</TableCell>
            <TableCell>
              STR<b>U</b>T, <b>u</b>ntidy, j<b>u</b>sticiable
            </TableCell>
            <TableCell>
              <b>a</b>ntes
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɜːr</TableCell>
            <TableCell>
              N<b>UR</b>SE, bl<b>urr</b>y, <b>Er</b>nesto, forew<b>or</b>d
            </TableCell>
            <TableCell>
              âmb<b>ar</b>, <b>ar</b>ca
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ʌr</TableCell>
            <TableCell>
              h<b>urr</b>y
            </TableCell>
            <TableCell>
              âmb<b>ar</b>, <b>ar</b>ca
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2">
        Vogais Fracas
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IPA</TableCell>
            <TableCell>Inglês</TableCell>
            <TableCell>Português</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ə</TableCell>
            <TableCell>
              COMM<b>A</b>, <b>a</b>bout
            </TableCell>
            <TableCell>
              c<b>a</b>ma
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ər</TableCell>
            <TableCell>
              LETT<b>ER</b>, forw<b>ar</b>d, hist<b>or</b>y
            </TableCell>
            <TableCell>
              âmb<b>ar</b>, <b>ar</b>ca
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ɪ</TableCell>
            <TableCell>
              <b>e</b>dition, rabb<b>i</b>t, Lat<b>i</b>n, heat<b>i</b>ng
            </TableCell>
            <TableCell>
              abr<b>i</b>, ju<b>i</b>z
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>oʊ</TableCell>
            <TableCell>
              mott<b>o</b>, retr<b>o</b>active, foll<b>ow</b>er
            </TableCell>
            <TableCell>???????</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>i</TableCell>
            <TableCell>
              HAPP<b>Y</b>, med<b>i</b>ocre
            </TableCell>
            <TableCell>
              abr<b>i</b>, ju<b>iz</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>iə</TableCell>
            <TableCell>
              Californ<b>ia</b>
            </TableCell>
            <TableCell>
              p<b>ia</b>, af<b>ia</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>u</TableCell>
            <TableCell>
              fr<b>u</b>ition
            </TableCell>
            <TableCell>
              <b>ú</b>til, br<b>uta</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>uə</TableCell>
            <TableCell>
              infl<b>ue</b>nce
            </TableCell>
            <TableCell>
              s<b>ua</b>, at<b>ua</b>
            </TableCell>
          </TableRow>
        </TableBody>
        <br />
        <br />
        <Typography gutterBottom variant="h5" component="h2">
          Consoante silábica
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>IPA</TableCell>
              <TableCell>Inglês</TableCell>
              <TableCell>Português</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>əl</TableCell>
              <TableCell>
                bott<b>le</b>
              </TableCell>
              <TableCell>
                Goog<b>le</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ən</TableCell>
              <TableCell>
                butt<b>on</b>
              </TableCell>
              <TableCell>
                arf<b>am</b>, órf<b>ão</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>əm</TableCell>
              <TableCell>
                rhyth<b>m</b>
              </TableCell>
              <TableCell>
                arf<b>am</b>, órf<b>ão</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Table>
      <b>Fontes:</b>{' '}
      <a href="https://en.wikipedia.org/wiki/Help:IPA/English" target="_blank">
        Inglês
      </a>
      ,{' '}
      <a
        href="https://en.wikipedia.org/wiki/Help:IPA/Portuguese"
        target="_blank"
      >
        Português
      </a>
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:AFI_para_ingl%C3%AAs"
        target="_blank"
      >
        Português
      </a>
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Alfabeto_fon%C3%A9tico_internacional"
        target="_blank"
      >
        Explicação
      </a>
    </div>
  );
};

export default EnglishPortugueseIpa;
