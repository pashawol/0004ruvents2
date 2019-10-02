Сборка на основе pug. scss, Bootstrap 4.3.3


4.3.3 
1. Добавил babel
2. в миксине pic  убрал переменную разширения.  По дефолту поставляется jpg  или прописывается в названии  - +pic("image.png")
3. Вывел дефолтные значения слайдера в переменную, чтобы не дублировать
4.3.2
1. Перенес шрифты в файл _fonts.scss https://github.com/pashawol/mega-front-starter/blob/master/sourse/sass/_fonts.scss
2. Перенес миксины в файл _mixin.scss https://github.com/pashawol/mega-front-starter/blob/master/sourse/sass/_mixin.scss
3. Добавил мискину bg , чтобы упростить работу с фоновыми изображениями https://github.com/pashawol/mega-front-starter/blob/master/sourse/sass/_mixin.scss
4. Упростил миксины для picture(https://github.com/pashawol/mega-front-starter/blob/4719542ab1dd4719c68799c9462c04ce67a932d1/sourse/pug/blocks/form-wrap/form-wrap.pug) и input (https://github.com/pashawol/mega-front-starter/blob/4719542ab1dd4719c68799c9462c04ce67a932d1/sourse/pug/blocks/form-wrap/form-wrap.pug)
5. Перенес в _vars.scss  переменные bootstrap. Теперь редактировать почти все в этом файле https://github.com/pashawol/mega-front-starter/blob/4719542ab1dd4719c68799c9462c04ce67a932d1/sourse/sass/_vars.scss

4.3.1

1. https://github.com/pashawol/starter/blob/db4800490bd50b9a8b98b7cbb4c955cf37d660fe/sourse/pug/blocks/form-wrap/form-wrap.pug
1.1 Переделал в  одну миксину для инпутов и textarea в pug
```
mixin input(pl,  t, p, name )
	mixin t(t,pl)
		if t== "textarea"
			+e.TEXTAREA.input.form-control( placeholder= pl name= name)&attributes(attributes)
		else if t && t== !"textarea"
			+e.INPUT.input(type= t placeholder= pl name= name)&attributes(attributes)
		else
			+e.INPUT.input(type="text" placeholder= pl name= name)&attributes(attributes)
	+e.input-wrap
		if p
			label
				+e.SPAN.title= p
				+t(t,pl)
		else
			+t(t,pl)
	// +e.input-wrap
```
1.2. Переделал в  одну миксину для инпутов  checkbox и radio
```
mixin in-c(typ, text, name )
	+b.LABEL.custom-input
		if typ
			+e.INPUT.input(type="radio" , name= name)
		else 
			+e.INPUT.input(type="checkbox" , name= name)

		+e.SPAN.lab
		if block
			block
		else
			+e.SPAN.text= text
```
2. https://github.com/pashawol/starter/blob/db4800490bd50b9a8b98b7cbb4c955cf37d660fe/sourse/pug/blocks/mixin-wrap/mixin-wrap.pug
2.1  Добавил второй  вариант  пагинации под worpress . Стили подогнал

========================================================================================

