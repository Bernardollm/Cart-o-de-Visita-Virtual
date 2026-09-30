import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [bio, setBio] = useState('');
  const [bioTemporaria, setBioTemporaria] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [notificacoes, setNotificacoes] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const mensagens = [
    'Lembrete: Hidrate-se! 💧',
    'Você está indo muito bem! 🚀',
    'Não esqueça de fazer uma pausa! ☕',
    'Continue estudando! 📚',
    'Respire fundo e continue. 🌱',
  ];

  useEffect(() => {
    let intervalo;

    if (notificacoes) {
      intervalo = setInterval(() => {
        const numeroAleatorio = Math.floor(
          Math.random() * mensagens.length
        );

        setMensagem(mensagens[numeroAleatorio]);
      }, 5000);
    } else {
      setMensagem('');
    }

  
    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [notificacoes]);

  function abrirModal() {
    setBioTemporaria(bio);
    setModalVisivel(true);
  }

  function salvarBio() {
    setBio(bioTemporaria);
    setModalVisivel(false);
  }

  function salvarDados() {
    Alert.alert(
      'Sucesso',
      'Dados salvos com sucesso!'
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        
            {/* Avatar */}
        <Image
  source={require('./assets/imagem.png.png')}
  style={styles.avatar}
/>

        <Text style={styles.nome}>
          Bernardo Ladeira
        </Text>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>
            Bio
          </Text>

          <View style={styles.caixaBio}>
            <Text style={styles.textoBio}>
              {bio}
            </Text>
          </View>

          <Pressable
            style={styles.botaoEditar}
            onPress={abrirModal}
          >
            <Text style={styles.textoBotaoEditar}>
              Editar bio
            </Text>
          </Pressable>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>
            Configurações
          </Text>

          <View style={styles.linhaConfiguracao}>
            <Text style={styles.textoConfiguracao}>
              Receber Notificações
            </Text>

            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{
                false: '#d0d0d0',
                true: '#9fc3ff',
              }}
              thumbColor={
                notificacoes ? '#1976d2' : '#f4f3f4'
              }
            />
          </View>
        </View>

        {/* Botão Salvar */}
        <Pressable
          style={styles.botaoSalvar}
          onPress={salvarDados}
        >
          <Text style={styles.textoBotaoSalvar}>
            Salvar
          </Text>
        </Pressable>

      </ScrollView>

      {mensagem !== '' && (
        <View style={styles.notificacao}>
          <Text style={styles.textoNotificacao}>
            {mensagem}
          </Text>
        </View>
      )}

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.fundoModal}>

          <View style={styles.modal}>
            <Text style={styles.tituloModal}>
              Editar Bio
            </Text>

            <TextInput
              style={styles.input}
              value={bioTemporaria}
              onChangeText={setBioTemporaria}
              placeholder="Digite sua bio..."
              multiline={true}
              textAlignVertical="top"
            />

            <View style={styles.botoesModal}>

              <Pressable
                style={styles.botaoCancelar}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoSalvarModal}
                onPress={salvarBio}
              >
                <Text style={styles.textoSalvarModal}>
                  Salvar
                </Text>
              </Pressable>

            </View>
          </View>

        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },

  container: {
    padding: 12,
    paddingBottom: 80,
    alignItems: 'stretch',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111111',
    marginBottom: 12,
  },

  secao: {
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 6,
    marginBottom: 10,
  },

  tituloSecao: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
  },

  caixaBio: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
  },

  textoBio: {
    fontSize: 12,
    color: '#555555',
  },

  botaoEditar: {
    alignSelf: 'flex-start',
    backgroundColor: '#2867e8',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 5,
  },

  textoBotaoEditar: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },

  linhaConfiguracao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },

  textoConfiguracao: {
    fontSize: 11,
    color: '#333333',
  },

  botaoSalvar: {
    backgroundColor: '#2867e8',
    borderRadius: 5,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 2,
  },

  textoBotaoSalvar: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Notificação inferior
  notificacao: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    right: 12,
    backgroundColor: '#101021',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  textoNotificacao: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    padding: 20,
  },

  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },

  tituloModal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    height: 70,
    padding: 8,
    fontSize: 12,
    color: '#333333',
  },

  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 8,
  },

  botaoCancelar: {
    backgroundColor: '#eeeeee',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 4,
  },

  textoCancelar: {
    fontSize: 10,
    color: '#333333',
  },

  botaoSalvarModal: {
    backgroundColor: '#2867e8',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  textoSalvarModal: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },

});